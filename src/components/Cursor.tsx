"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
export default function Cursor() {
    useEffect(() => {
        const cursor = document.querySelector('.cursor-pointer');
        const root = document.querySelector('#root');
        const links = document.querySelectorAll('button');

        root?.addEventListener('mousemove', (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(cursor, {
                x: clientX - 10,
                y: clientY - 10,
                duration: 0.3,
            });

        });

        links.forEach((link) => {
            link.addEventListener('mouseenter', () => {
                cursor.innerHTML = 'View';
                gsap.to(cursor, { 
                    scale: 4 
                });
            });
            link.addEventListener('mouseleave', () => {
                cursor.innerHTML = '';
                gsap.to(cursor, { 
                    scale: 1 
                });
            });
        });
    }, []);
    return (<><div className="cursor-pointer"></div></>)

}
