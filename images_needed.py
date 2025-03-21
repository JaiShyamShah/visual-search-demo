from datasets import load_dataset

# Load the dataset
dataset = load_dataset("kg-09/Fashion-dataset", split="train")

# Query the first 100 images
queried_images = dataset.select(range(100))

from PIL import Image
import os

# Create a directory to save the images
output_dir = "default_images"
os.makedirs(output_dir, exist_ok=True)

# Save each image
for i, item in enumerate(queried_images):
    image = item["image"]  # Access the image
    image_path = os.path.join(output_dir, f"image_{i}.jpg")  # Save as JPEG
    image.save(image_path)

print(f"Downloaded {len(queried_images)} images to {output_dir}")