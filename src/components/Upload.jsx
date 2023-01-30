import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

export default function Upload() {
    const { uploadVideos } = UserAuth();
    const [vids, setVids] = useState([]);   

    const handleUpload = () => {
        console.log(vids)
        uploadVideos(vids)
    };




    return (
        <div>
            <div className='p-4'>
                <input type="file" multiple className="p-4 bg-blue-600 text-white" onChange={(e) => setVids(e.target.files)} />
                <button className='bg-blue-500 p-4 m-4 rounded-lg text-white'  onClick={handleUpload}>Upload</button>
            </div>



        </div>
    )
}
