import urllib.request

# List of video URLs
links = [
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/149/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/164/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/157/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/161/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/159/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/158/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/165/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/166/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/168/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/174/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/167/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/169/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/170/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/171/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/172/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/173/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/175/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/176/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/177/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/178/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/179/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/185/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/180/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/181/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/183/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/184/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/182/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/146/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/147/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/148/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/160/day_1/original.mp4",
"https://s3.amazonaws.com/media.lyrics2learn.com/production/lessons/156/day_1/original.mp4"

]

# Iterate over the links and download the videos
for link in links:
    # Get the video file name
    file_name = link.split("/")[-1]
    print("Downloading", file_name)
    # Download the video
    urllib.request.urlretrieve(link, f"{file_name}_{count}")
    count += 1
    print("Download complete!")