import requests
from tqdm.auto import tqdm
import os
import shutil
import math
import random

__TOKEN__ = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDU2MzAwNDYyMjBfODcyZjg4MjUtY2FmZC00MDdjLWEwNDMtMjc1NzQwNmY2NzBhX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJjbGlvLXBsYXlncm91bmQtd2ViIiwidXNlcl9pZCI6IjlDODUyNEZENjNERUUzQzgwQTQ5NUZBMUBkNDc5Mjg5OTYzYzRjZWEzNDk1ZTlmLmUiLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IjkyMjAyNUVBNjNERUUzQzgwQTQ5NUZBM0AxNDIyNDhmNDVlNjZmZGJjMGE0OTVlNGEiLCJjdHAiOjAsImZnIjoiWUVCSDZHSDZGUFA1NEhVS0hNUVZZSEFBR1k9PT09PT0iLCJzaWQiOiIxNzAwMjA1MDU2Mzg4X2NmYzM5ZWY5LTllZDAtNDE5OC04Y2RmLTUwMTAxZmJlNTQxYV91dzIiLCJtb2kiOiIxYjI2NTlmYyIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3MDU2MzAwNDYyMjAiLCJzY29wZSI6IkFkb2JlSUQsZmlyZWZseV9hcGksb3BlbmlkLHBwcy5yZWFkLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8ub3duZXJPcmcsdWRzX3JlYWQsdWRzX3dyaXRlIn0.AkAl3N_QywIpTqYeayKilbTQCDJ7AXB2aOFYzs3BAvDmgdZBeNsUwH9q-B0JCIqMLarMTuVDh2KdfdAH94mal02h4SAxvUo12wahBm0ei7-KZ-Hv5IUojDTsx34RhGVGrLEhmvjdtHFBfPbWkzuF6R4rUqxSgc5DKiH_nUu6rqhL-00AgbM1w_T8v5BAQ64gQoEUzpb9TtQApUF1L1rloje0gLd6zj77xpV9Tb-RGlifjEpALdy4rDl8Fy1XiKAc6rZZuyFBgkpifndEixwNqFwJpH8HFy5s9lgNNWdAdGzorAhlCKlYxCAq7oIXe9LGV8vehDucCGCUV65_b7BUcQ'

def download_img(img_links):
    # img_links = [[url, name], ...]]

    for img_link in tqdm(img_links, desc="Downloading the images"):
        img_r = requests.get(img_link[0], stream=True)
        img_name = img_link[1] + ".png"
        path = "./public/images/" + img_name
        try:
            imgdir = open(os.path.normpath(path), "wb")
        except FileNotFoundError:
            os.makedirs(os.path.dirname(path))
        else:
            imgdir.close()
        with open(os.path.normpath(path), "wb") as f:
            shutil.copyfileobj(img_r.raw, f)
        del img_r

def generate_seed(length):
    # length is the length of the seed
    seed = ''
    for i in range(length):
        seed += str(math.floor(random.random() * 10))

    seed = int(seed)
    return seed

def split_into_4(arr):
    temp = []
    for i,n in enumerate(arr):
        if i % 4 == 0:
            temp.append([])
        temp[-1].append(n)
    
    return temp


def request_image_url(prompts):
    # seeds = [seed1, seed2, seed3, seed4]

    url = "https://firefly.adobe.io/v2/images/generate"

    data = {
        "prompt": prompts,
        "contentClass": "art",
        "size":{"width":2048,"height":2048},
        "visualIntensity":10,
        "styles":{"presets":["bold_line","doodle_drawing"],"strength":100},
        "locale":"en-US",
        "seeds": [generate_seed(5) for i in range(4)]
    }

    headers = {
        "Content-Type": "application/json",
        "Context-length": data.__sizeof__().__str__(),
        "Connection": "keep-alive",
        "Authorization": f"Bearer {__TOKEN__}",
        "Host": "firefly.adobe.io",
        "Origin": "https://firefly.adobe.com",
        "Pragma": "no-cache",
        "Referer": "https://firefly.adobe.com/",
        "x-api-key": "clio-playground-web",
        "x-request-id": "34790d11-8a42-473e-a5df-319aff3bdb7a"
    }

    r = requests.post(url, json=data, headers=headers)

    if r.status_code != 200 and r.status_code != 500:
        print(r.status_code)
        print(r.json())
        exit()

    imageLinks = []

    if r.status_code == 200:
        outputs = r.json()['outputs']
        
        for output in outputs:
            data = []
            data.append(output['image']['presignedUrl'])
            data.append(output['image']['id'])

            imageLinks.append(data)

    return imageLinks

def main(promptsList):

    imageLinks = []

    for i in tqdm(range(len(promptsList)), desc="Requesting image url"):
        imageLinks += request_image_url(promptsList[i])
    
    #print(imageLinks)
    download_img(imageLinks)

if __name__ == "__main__":

    prompts = [
        # "1 calico cat, sitting, clean solid white background, looking at the camera",
        # "1 calico cat, sleeping, clean solid white background, looking away the camera",
        # "1 calico cat, walking, clean solid white background, looking away the camera",
        # "1 gray tabby cat, sitting, clean solid white background, looking at the camera",
        # "1 gray tabby cat, sleeping, clean solid white background, looking away the camera",
        # "1 gray tabby cat, walking, clean solid white background, looking at the camera",
        "1 orange tabby cat, sitting, clean solid white background, looking at the camera",
        # "1 orange tabby tabby cat, sleeping, clean solid white background, looking away the camera, camera is tilted, can see full body, simple",
        "1 orange tabby cat, walking, clean solid white background, looking at the camera",
        # "1 black tabby cat, sitting, clean solid white background, looking at the camera",
        # "1 black tabby cat, sleeping, clean solid white background, looking away the camera",
        # "1 black tabby cat, walking, clean solid white background, looking at the camera",
    ]

    prompts = prompts * 10

    main(prompts)


