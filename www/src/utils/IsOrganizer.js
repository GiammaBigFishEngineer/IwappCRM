import React from 'react'
import RenderList from './RenderList';
import {URL} from '../index';

function IsOrganizer () {
    const session_data = RenderList(URL+'session_data');
    if(session_data.priorita === 0){
        return true;
    }else{
        return false;
    }
}
export default IsOrganizer