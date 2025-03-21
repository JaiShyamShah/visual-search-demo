
import os
import torch
import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from transformers import AutoProcessor, AutoModel
from torch.nn.functional import cosine_similarity
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS to allow frontend to communicate with our API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load model and processor
model = AutoModel.from_pretrained(
    "google/siglip-so400m-patch14-384",
    torch_dtype=torch.float16,
    attn_implementation="sdpa",
    device_map=device
).eval().to(device)

processor = AutoProcessor.from_pretrained("google/siglip-so400m-patch14-384")

def get_image_embeddings(image, model, processor):
    with torch.no_grad():
        inputs = processor(images=image, return_tensors="pt").to(device)
        return model.get_image_features(**inputs)

def load_default_images():
    target_paths = []
    if os.path.exists("./default_images"):
        for file in os.listdir("./default_images"):
            if file.lower().endswith(('png', 'jpg', 'jpeg')):
                target_paths.append(os.path.join("./default_images", file))
    return target_paths

class SearchResult(BaseModel):
    path: str
    similarity: float

@app.post("/query_image")  # Changed from GET to POST since we're receiving file data
async def query_image(file: UploadFile = File(...)):
    query_img = Image.open(file.file).convert("RGB")
    query_emb = get_image_embeddings(query_img, model, processor)
    
    target_paths = load_default_images()
    if not target_paths:
        return JSONResponse(content={"error": "No images found in default database!"}, status_code=404)
    
    similarities = []
    for path in target_paths:
        try:
            img = Image.open(path).convert("RGB")
            emb = get_image_embeddings(img, model, processor)
            sim = cosine_similarity(query_emb, emb).item()
            similarities.append((sim, path))
        except Exception as e:
            return JSONResponse(content={"error": f"Error processing {path}: {str(e)}"}, status_code=500)
    
    top_3_matches = sorted(similarities, key=lambda x: x[0], reverse=True)[:3]
    results = [SearchResult(path=path, similarity=float(score)) for score, path in top_3_matches]
    
    return {"results": results}

@app.post("/add_image")
async def add_image(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('png', 'jpg', 'jpeg')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PNG, JPG, and JPEG are allowed.")
    
    default_images_dir = "./default_images"
    os.makedirs(default_images_dir, exist_ok=True)
    
    file_path = os.path.join(default_images_dir, file.filename)
    
    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")
    
    return JSONResponse(content={"message": f"Image {file.filename} added successfully to default images folder"}, status_code=200)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
