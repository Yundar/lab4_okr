import {getData} from "./script.js";
import {ShowPreLoader} from "./script.js";

export default class Home{
    constructor(){
        this.route = 'home';
        this.content = document.getElementById("content");
    }

    loadPage() {
        this.loadHome();
        return true;
    }

    loadHome() {

        this.content.innerHTML = ShowPreLoader();

        this.content.innerHTML = `
        ${this.loadSlider()}
        `;
        this.sliderScript();
        
    }

    loadSlider(){
        return `
        <div class="flex-wrapper">
            <div class="slide-wrapper">
                <div class="slide active">
                    <img src="img/slider/coffee-to-go.png" alt="">
                </div>
                <div class="slide">
                    <img src="img/slider/action.png" alt="">
                </div>
                <div class="slide">
                    <img src="img/slide/life-begins.png" alt="">
                </div>
            </div>
            
        </div>
        <div class="dots-wrapper">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
        `
    }

    sliderScript(){
        const slides = document.querySelectorAll(".slide");
        const slidesWrapper = document.querySelector(".slider-wrapper");
        const dots = document.querySelectorAll(".dot");

        let index = 0;

        const activeSlide = n => {
            for(slide of slides) {
                slide.classList.remove('active');
            }
            slides[n].classList.add('active');
        }

        const activeDot = n => {
            for(dot of dots) {
                dot.classList.remove('active');
            }
            dots[n].classList.add('active');
        }

        const nextSlide = () => {
            if(index == slides.length - 1){
                index = 0;
                prepareCurrentSlide(index);
            } else {
                index ++;
                prepareCurrentSlide(index);
            }

        }

        const prepareCurrentSlide = ind => {
            activeSlide(ind);
            activeDot(ind);
        }

        console.log(dots)

        dots.forEach((item, indexDot) => {
            item.addEventListener('click', () => {
                index = indexDot;
                prepareCurrentSlide(index);
            })
        })

        const interval = setInterval(nextSlide, 5000);

    }
}