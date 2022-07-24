# Audio Platform Client

**Audio Platform** is an app that combines a player functionality with upload and share functions.

Here you can find a [live version](https://audio-platform.netlify.app/) and the [API](https://github.com/kiriushkin/audio-platform-api) it's using.

![Preview](https://i.ibb.co/rHDYJrw/Preview.jpg)

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

### Authentication

It requires an authentication for certain actions such as upload, or delete audio.

![Auth Screenshot](https://i.ibb.co/wSsZR8H/Auth-screen.jpg)

### Upload audio

There are two ways to upload an audio:

- Drag'n'drop
- Selecting file via file manager

> You have to be authorized as admin to perform these actions.

> If audio title isn't already specified, it takes the file name of provided audio file.

![Upload Screenshot](https://i.ibb.co/kJppFD7/Upload-screen.jpg)

### Edit and delete audio

You're provided editing and deleting functionality.

> You have to be authorized as admin to perform these actions.

![Editing Screenshot](https://i.ibb.co/vDwJxQz/Edit-screen.jpg)

### Search by audio name

You can use search to find specific audio.

![Searching Screenshot](https://i.ibb.co/pRBLhJg/Search-screen.jpg)

### Share any audio from the list

You can copy the share link of any audio in the list simply by clicking the share button.

![Share Screenshot](https://i.ibb.co/Cwr1FSB/Share-screen.jpg)
