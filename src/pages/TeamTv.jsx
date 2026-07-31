import { Link, useNavigate } from 'react-router-dom';
import { db } from "../firebase.js";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { header } from '../Components/header.jsx';

function TeamTv() {

    return (
        <>
            {header()}
            <div>
                
            </div>
        </>
    );
}

export default TeamTv;