from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import csv
import numpy as np

data = pd.read_csv("dataForItemBased.csv")
ui_matrix = data.pivot(index="userId",columns="title",values="ratings").fillna(0)
movie_title = ui_matrix.columns
movie_index = pd.Series(movie_title, index=(range(len(movie_title))))
movie_indices = pd.Series(range(len(movie_title)), index=movie_title)

sum_ratings = ui_matrix.sum(axis=0)
num_ratings = ui_matrix[ui_matrix>0].count()
average_rating = sum_ratings/num_ratings

def itemBasedRec(user_id, movie_name,):

    movie_id = movie_indices[movie_name]
    ui_matrix_ = ui_matrix.dropna()
    cos_sim = cosine_similarity(ui_matrix_.T,ui_matrix_.T)

    sim_scores = list(enumerate(cos_sim[movie_id]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:5+1]
    r_ui = average_rating[movie_name]

    total_scores = sum([i[1] for i in sim_scores])
    for movie_j, score_ij in sim_scores:
        r_uj = ui_matrix.loc[user_id, movie_index[movie_j]]
        r_avg_j = average_rating.iloc[movie_j]
        r_ui += ((score_ij*(r_uj - r_avg_j))/total_scores)

    # print("Predicted score of user " +str(user_id) + " for " + str(movie_name) + ": " + str(r_ui)) 
    print(f"Recommendations for {movie_name}: ", end=''+"\n")
    rec_movies = [movie_index[i[0]] for i in sim_scores]
    for i,j in enumerate(rec_movies):
        print(str(j) + ", with similarity score of " + str(round(sim_scores[i][1],5)))
        

# Example use: To get (5) recommended movies for movie Ant-Man (2015) of userId 15, uncomment the next line

# itemBasedRec(15, "Ant-Man (2015)")