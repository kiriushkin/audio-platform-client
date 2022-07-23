# Audio Platform Client

![Preview]()

**Audio Platform** is an app that combines a player functionality with upload and share functions.

Here you can find a [live version](https://audio-platform.netlify.app/) and the [API](https://github.com/kiriushkin/audio-platform-api) it's using.

## Features

### Player

The app contains a basic player functionality such as:

- Play / Pause
- Previous / Next
- Volume change
- Mute / Unmute
- Audio timeline
- Jump to position by clicking the timeline
- Saving to local cache current song, it's position and volume

![Player Screenshot]()

### Authentication

It requires an authentication for certain actions such as upload, or delete audio.

![Auth Screenshot]()

### Upload audio

There are two ways to upload an audio:

- Drag'n'drop
- Selecting file via file manager

> You have to be authorized as admin to perform these actions.

> If audio title isn't already specified, it takes the file name of provided audio file.

![Upload Screenshot]()

### Edit and delete audio

You're provided editing and deleting functionality.

> You have to be authorized as admin to perform these actions.

![Editing Screenshot]()

### Filter and sort audio list

You can use search to find specific audio or change audio displaying order by clicking the column titles.

![Searching Screenshot]()

### Share any audio from the list

You can copy the share link of any audio in the list simply by clicking the share button.

![Share Screenshot]()
