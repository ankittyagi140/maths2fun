'use client'
import React from 'react'
import {Button} from '@/components/ui/button';

import {CustomButton} from '../utils/types';

const ButtonCustom:React.FC<CustomButton>=({children,variant="default",onClick})=>{
    return <Button variant={variant} onClick={onClick}>{children}</Button>
}

export default ButtonCustom;