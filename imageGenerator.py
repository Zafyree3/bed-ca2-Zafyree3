import requests
import os

API_URL = "https://api-inference.huggingface.co/models/dataautogpt3/OpenDalle"
headers = {"Authorization": "Bearer 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"}

cat_types = [
    "Calico",
    "Orange Tabby",
    # "Orange and White Tabby",
    # "Calio Tabby",
    "Tortoiseshell",
    # "Pointed",
    "Black",
    # "Black with white mitts",
    "Grey & White",
    "Brown Tabby",
    "Solid Gray",
    "Solid White",
    "Chocolate brown",
    
    # "Brown and white Tabby",
]

prompt_formats = [
    "Pixel art of a {cat_type} cat sitting down in front of a white background",
    # "Pixel art of a {cat_type} cat in front of a white background",
    "Pixel art of a {cat_type} cat sleeping in front of a white background",
    "Pixel art of a {cat_type} cat walking in front of a white background",
]

def generate_image(prompt):

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content
    image_bytes = query({
        "inputs": prompt
    })

    # You can access the image with PIL.Image for example
    import io
    from PIL import Image

    import os
    from os import listdir
    from os.path import isfile, join

    cwd = os.path.join(os.getcwd(), "public/images")
    onlyfiles = [os.path.join(cwd, f) for f in os.listdir(cwd) if 
    os.path.isfile(os.path.join(cwd, f))]

    count = len(onlyfiles)

    try:
        # image = Image.open(io.BytesIO(image_bytes))
        # #image.show()
        # image.save(f"public/images/{count+1}.jpg")
        # image.close()

        byteImgIO = io.BytesIO()
        byteImg = Image.open(io.BytesIO(image_bytes))
        byteImg.save(byteImgIO, "JPEG")
        byteImgIO.seek(0)
        with open(f"public/images/{count+1}.jpg", "wb") as f:
            f.write(byteImgIO.read())

    except Exception as e:
        print(e)

    return f"{count+1}.jpg"

all_possible_prompts = []

for cat_type in cat_types:
    for prompt_format in prompt_formats:
        all_possible_prompts.append(prompt_format.format(cat_type=cat_type))

for prompt in all_possible_prompts:
    print(f"Generating image for prompt: {prompt}")
    generate_image(prompt)
    print(f"Done image for prompt: {prompt}")

print("Done generating images")




