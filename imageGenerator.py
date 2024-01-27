import requests
from tqdm.auto import tqdm
import os
import shutil
import math
import random

__TOKEN__ = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDYzMjQ0ODk4MzZfMDczOTBjOWMtM2ZmYS00YjJmLTk2ZTktNzQyZWFhMGU5ZTVjX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJjbGlvLXBsYXlncm91bmQtd2ViIiwidXNlcl9pZCI6IjlDODUyNEZENjNERUUzQzgwQTQ5NUZBMUBkNDc5Mjg5OTYzYzRjZWEzNDk1ZTlmLmUiLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IjkyMjAyNUVBNjNERUUzQzgwQTQ5NUZBM0AxNDIyNDhmNDVlNjZmZGJjMGE0OTVlNGEiLCJjdHAiOjAsImZnIjoiWUVYM0tINDJGUFA1NEhVS0hNUVZZSEFBR1k9PT09PT0iLCJzaWQiOiIxNzAwMjA1MDU2Mzg4X2NmYzM5ZWY5LTllZDAtNDE5OC04Y2RmLTUwMTAxZmJlNTQxYV91dzIiLCJtb2kiOiJhYjg1MTgxMyIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3MDYzMjQ0ODk4MzYiLCJzY29wZSI6IkFkb2JlSUQsZmlyZWZseV9hcGksb3BlbmlkLHBwcy5yZWFkLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8ub3duZXJPcmcsdWRzX3JlYWQsdWRzX3dyaXRlIn0.fAi3Me54TM_oEz5RAvWjYzk5QoBnjEiypzUznstm8LLTFSWJmGsdVQ3N_ozGfmQJeRgmwuHV4iNyH8Ftw89Cg0gWgr3JnHkB4JgvQy65VqDL_HniK0tVzCrx3gYwkQfAOluxn-idbDxkkpWXc-g3OsbqW_Hedn7G3ktOWxkCBKbR8aokaYOQNt0fYtEpeWs8KhZU5a5Q_2lmM1sbzQ74xgquLvK-7vS2ywUMyMIyDTYuEpdP8wvDyUEiSoDtwrTuhcrQpO2uImE2ihUV5PPt94_G7mo0jH0I9h3SHqxrZPmsLxd8YoQK7QNgpzLe4V2LOaVr4gLf8QJGxIZsrhAprQ'

def download_img(img_links):
    # img_links = [[url, name], ...]]

    for img_link in tqdm(img_links, desc="Downloading the images"):
        img_r = requests.get(img_link[0], stream=True)
        img_name = img_link[1] + ".png"
        path = f"./public/images/0_{img_name}"
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
        "visualIntensity":9,
        "styles":{"presets":["bold_line","doodle_drawing"],"strength":90},
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
        "1 solid black box with a white question mark in the middle",
    ]

    prompts = prompts * 5

    main(prompts)


