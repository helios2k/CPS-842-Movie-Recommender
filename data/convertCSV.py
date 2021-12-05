import json
import csv
import pandas as pd

def jsontocsv():
    aDict = {
        "userId": [],
        "movieId": [],
        "ratings": [],
        "title": []
    }
    with open("filteredData.json",'r') as f:
        data = json.load(f)
        for movieId in data.keys():
            title = data[movieId]["title"]
            for userId,rating in data[movieId]["ratings"].items():
                aDict["userId"].append(userId)
                aDict["movieId"].append(movieId)
                aDict["ratings"].append(rating)
                aDict["title"].append(title)
    df = pd.DataFrame(aDict)
    df.to_csv("calcData.csv",index=False)

def userItemMatrix():
    data = pd.read_csv("calcData.csv")
    user_item_matrix = data.pivot(index="userId",columns="title",values="ratings").fillna(0)
    user_item_matrix.to_csv("userItemMatrix.csv",index=True)
