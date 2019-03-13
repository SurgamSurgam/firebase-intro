import React from 'react';
import * as firebase from 'firebase';
import ImageService from '../services/images';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBCYDCt-fbPWjipeVbxeSfv5oHL0LY7HqY",
  authDomain: "notetorious-beb4d.firebaseapp.com",
  databaseURL: "https://notetorious-beb4d.firebaseio.com",
  projectId: "notetorious-beb4d",
  storageBucket: "notetorious-beb4d.appspot.com",
  messagingSenderId: "652320142575"
};
firebase.initializeApp(config);

export default class Home extends React.Component {

  saveImage = (url) => {
    const date = Date();
    ImageService.saveImage(url, date);
    this.props.history.push('/')
  }

  handleFileInput = (e) => {
    console.dir(e.target);
    const firstFile = e.target.files[0];
    //this gives me direct access to the root of my bucket
    const root = firebase.storage().ref()
    const newImage = root.child(firstFile.name);
    // const newImage = root.child('images/' + firstFile.name); to set it inside a folder

    newImage.put(firstFile)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL()
      })
      .then((url)=>{
        console.log(url);
        this.saveImage(url)
      })
  }

  render() {

    return (
      <div className='container'>
        <div className="input-group mb-3">
          <div className="custom-file">
            <input type="file" className="custom-file-input" onChange={this.handleFileInput}/>
            <label className="custom-file-label">Upload Image</label>
          </div>
        </div>
      </div>
    );
  }
}
