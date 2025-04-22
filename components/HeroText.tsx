"use client";
import React, { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
export default function HeroText({ text }: { text: string }) {
    useEffect(function animateText(){
        var heroElement:any = document.getElementById("heroText")
        if (!text){
            console.error("Provide text to the Hero Text")
        }
        var arrayContaingSplittedHeroText=text?.split("")
        var clutter:String="";
        arrayContaingSplittedHeroText?.forEach((char:String) => {
            clutter+=`<span id="heroTextFragment" style="opacity: 0; transform: translateY(20px); display: inline-block;">${char}</span>`
        })
        heroElement.innerHTML = clutter;
        console.log(clutter);
        gsap.to("#heroTextFragment", {
            opacity: 1,
            delay:1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out"
        })
        gsap.fromTo("#heroTextFragment",{})
        
    }, [text])
    
  return (
    <h1 id="heroText"></h1>
  )
}
