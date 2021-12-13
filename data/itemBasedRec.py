from re import T
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import csv
import numpy as np
import json
import os

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
    df.to_csv("dataForItemBased.csv",index=False)

def userItemMatrix():
    data = pd.read_csv("dataForItemBased.csv")
    user_item_matrix = data.pivot(index="userId",columns="title",values="ratings").fillna(0)
    user_item_matrix.to_csv("userItemMatrix.csv",index=True)

data = pd.read_csv("dataForItemBased.csv")
ui_matrix = data.pivot(index="userId",columns="title",values="ratings").fillna(0)
movie_title = ui_matrix.columns
movie_index = pd.Series(movie_title, index=(range(len(movie_title))))
movie_indices = pd.Series(range(len(movie_title)), index=movie_title)

sum_ratings = ui_matrix.sum(axis=0)
num_ratings = ui_matrix[ui_matrix>0].count()
average_rating = sum_ratings/num_ratings
jsonObj = {}
for title in movie_title:
    jsonObj[title] = {}

def itemBasedRec(user_id, movie_name):
    with open("recommendation.json",'r') as f:
        jsonObj = json.load(f)
    movie_id = movie_indices[movie_name]
    ui_matrix_ = ui_matrix.dropna()
    cos_sim = cosine_similarity(ui_matrix_.T,ui_matrix_.T)

    sim_scores = list(enumerate(cos_sim[movie_id]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:4+1]
    r_ui = average_rating[movie_name]

    total_scores = sum([i[1] for i in sim_scores])
    for movie_j, score_ij in sim_scores:
        r_uj = ui_matrix.loc[user_id, movie_index[movie_j]]
        r_avg_j = average_rating.iloc[movie_j]
        r_ui += ((score_ij*(r_uj - r_avg_j))/total_scores)

    # print("Predicted score of user " +str(user_id) + " for " + str(movie_name) + ": " + str(r_ui))
    rec_movies = [movie_index[i[0]] for i in sim_scores]
    # for i,j in enumerate(rec_movies):
    #     print(str(j) + " "+ str(round(sim_scores[i][1],5)))
    for i,j in enumerate(rec_movies):
        jsonObj[movie_name][j] = round(sim_scores[i][1],5)
    with open("recommendation.json",'w') as f:
        json.dump(jsonObj,f)


jsontocsv()
userItemMatrix()
itemBasedRec(15, "Guardians of the Galaxy (2014)")
itemBasedRec(15, "Fantastic Four (2005)")
itemBasedRec(15, "Ant-Man (2015)")
itemBasedRec(15, "Deadpool (2016)")
itemBasedRec(15, "Avengers: Infinity War - Part I (2018)")
itemBasedRec(15, "Thor: Ragnarok (2017)")
itemBasedRec(15, "Guardians of the Galaxy 2 (2017)")
itemBasedRec(15, "Captain America: Civil War (2016)")
itemBasedRec(15, "Doctor Strange (2016)")
itemBasedRec(15, "X-Men: Apocalypse (2016)")
itemBasedRec(15, "Spider-Man: Homecoming (2017)")
itemBasedRec(15, "Deadpool 2 (2018)")