/* eslint-disable no-unused-vars */
import React from  'react';
import { useState } from 'react';
import { TagsInput } from "react-tag-input-component";



const ReactTagsInput =()=> {

  const [tags, setTags] = useState(["JPG ","GIF","PNG "]);
        return (
            <div>
                  <TagsInput
                  tags={tags}
                  value={tags}
                 
            //    placeHolder="Meta Keywords"
                  />
            </div>
        )
    }

 
export default ReactTagsInput;