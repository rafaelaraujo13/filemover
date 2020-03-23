const fs = require("fs");
const path = require("path");

const imageExt = [".jpeg", ".jpg", ".png", ".svg"]; // Image extensions
const audioExt = [".mp3", ".wma", ".wav"]; // Audio extensios
const videoExt = [".mp4", ".avi", ".wmv", ".mkv", ".mov"]; // Video extensions

const folders = {
  dir: "/home/rafael/Downloads", // Directory to be cleaned
  images: "/home/rafael/Pictures", // Images directory
  videos: "/home/rafael/Videos", // Videos directory
  audios: "/home/rafael/Music", // Audios directory
  docs: "/home/rafael/Documents" // Docs directory
};

fs.readdir(folders.dir, (err, files) => {
  if (err) {
    console.log("Error: " + err);
  } else {
    files.forEach(file => {
      console.log("Moving File: " + file);
      moveFile(file);
    });
  }
});

function moveFile(filename) {
  const file = folders.dir + "/" + filename;
  const ext = path.extname(file);
  try {
    if (imageExt.includes(ext)) {
      fs.copyFileSync(
        file,
        path.join(folders.images + "/" + path.basename(file))
      );
    } else if (audioExt.includes(ext)) {
      fs.copyFileSync(
        file,
        path.join(folders.audios + "/" + path.basename(file))
      );
    } else if (videoExt.includes(ext)) {
      fs.copyFileSync(
        file,
        path.join(folders.videos + "/" + path.basename(file))
      );
    } else {
      fs.copyFileSync(
        file,
        path.join(folders.docs + "/" + path.basename(file))
      );
    }
  } catch (err) {
    console.log("Couldn't Move: " + path.basename(file));
  }

  fs.unlink(file, () => {
    console.log("Deleting From Original Folder: " + file);
  });
}
