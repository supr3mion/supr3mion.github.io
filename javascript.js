
$(document).ready(function() {

    const logo = document.getElementById("nhl_logo")
    const themeButton = document.getElementById("themeButton")

    const containerButton = document.getElementById('container_button')
    const nhlContainerVersion1 = document.getElementById('nhl_container_version1')
    const nhlContainerVersion2 = document.getElementById('nhl_container_version2')

    const fullscreenButton = document.getElementById('fullscreen');

    const themes = ['light', 'dark', 'stendenLight', 'stendenDark', 'stendenDefault']
    let currentTheme = themes.length - 1

    let currentContainer = 1;

    themeButton.addEventListener('click', function () {

        // const currentClassName = document.documentElement.className;
        currentTheme++
        if (currentTheme >= themes.length) {
            currentTheme = 0
        }
        // console.log(currentTheme)
        document.documentElement.className = themes[currentTheme]
        // console.log(themes[currentTheme])

    })

    fullscreenButton.addEventListener('click', function () {

        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    })

    containerButton.addEventListener('click', function () {

        switch (currentContainer){

            case 1:
                nhlContainerVersion1.style.display = "none"
                nhlContainerVersion2.style.display = "grid"
                currentContainer = 2
                break;

            case 2:
                nhlContainerVersion1.style.display = "grid"
                nhlContainerVersion2.style.display = "none"
                currentContainer = 1
                break;

        }

    })

    // const dimensions = document.getElementById("dimensions")
    //
    // function dimensionsGet() {
    //     // console.log(document.getElementById('dimensionBox').clientHeight)
    //     // console.log(document.getElementById('dimensionBox').clientWidth)
    //     dimensions.innerHTML = "height: " + document.getElementById('dimensionBox').clientHeight
    //     dimensions.innerHTML += "<br>width: " + document.getElementById('dimensionBox').clientWidth
    // }
    //
    // dimensionsGet()
    // addEventListener("resize", (event) => {
    //     dimensionsGet()
    // });



    const svgContainer = document.getElementById('svg_container')

    const colors = ['#009ba7', 'var(--logo-color)', '#de1b2e', 'transparent']
    const shapes = ['M 375 187.500 L 375 375 187.500 375 L 0 375 0 500 L 0 625 187.500 625 L 375 625 375 812.500 L 375 1000 500 1000 L 625 1000 625 812.503 L 625 625.005 812.750 624.753 L 1000.500 624.500 1000.754 499.500 L 1001.008 374.500 813.004 374.755 L 625 375.010 625 187.505 L 625 0 500 0 L 375 0 375 187.500 M 0.485 500 C 0.485 569.025, 0.604 597.262, 0.750 562.750 C 0.896 528.237, 0.896 471.762, 0.750 437.250 C 0.604 402.737, 0.485 430.975, 0.485 500',
    'M 0 500 L 0 1000 200 1000 L 400 1000 400 700 L 400 400 699.998 400 L 999.997 400 1000.250 699.750 C 1000.419 900.108, 1000.586 833.791, 1000.752 499.750 L 1001 0 500.500 0 L 0 0 0 500 M 0.496 500.500 C 0.496 775.500, 0.610 887.851, 0.750 750.168 C 0.890 612.486, 0.890 387.486, 0.750 250.168 C 0.610 112.851, 0.496 225.500, 0.496 500.500']
    const shapeRotations = ['315', '45', '135', '225']

    // function init() {
    //     for (const child of svgContainer.children) {
    //         console.log(child);
    //     }
    // }

    // init()

    function randomPattern() {



        let prevIdColor = 0
        let prevIdRotation = 0
        let prevIdShape = 0

        let currentIdColor = 0
        let currentIdRotation = 0
        let currentIdShape = 0

        while(svgContainer.childElementCount !== 5) {

            const svgLevel = document.createElement('div')
            svgLevel.style.display = 'grid'
            svgLevel.style.gap = '10px'
            svgLevel.style.transform = 'translateY(' + ((svgContainer.childElementCount + 1) * 15) + 'px)'
            svgLevel.style.transform = 'translateX(' + ((svgContainer.childElementCount + 1) * 15) + '%)'
            svgLevel.style.height = '4.8%'

            const amount = Math.floor(20 - (svgContainer.childElementCount + 1))

            while (svgLevel.childElementCount !== 15) {

                const parent = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                parent.setAttribute('width', '40%')
                parent.style.minWidth = '20px'
                parent.style.maxWidth = '45px'
                parent.setAttribute('viewBox', '0 0 1000 1000')


                currentIdColor = Math.floor(Math.random() * 4)
                while (prevIdColor === currentIdColor) {
                    currentIdColor = Math.floor(Math.random() * 4)
                }
                prevIdColor = currentIdColor

                parent.setAttribute('fill', colors[prevIdColor])

                currentIdRotation = Math.floor(Math.random() * 4)
                while (prevIdRotation === currentIdRotation) {
                    currentIdRotation = Math.floor(Math.random() * 4)
                }
                prevIdRotation = currentIdRotation

                parent.style.transform = "rotate(" + shapeRotations[prevIdRotation] + "deg)"

                parent.style.margin = '20px'

                const child = document.createElementNS('http://www.w3.org/2000/svg', 'path')

                currentIdShape = Math.floor(Math.random() * 15)
                while (prevIdShape === currentIdShape) {
                    currentIdShape = Math.floor(Math.random() * 15)
                }
                prevIdShape = currentIdShape

                child.setAttribute('d', shapes[1])

                if (prevIdShape > 0) {
                    child.setAttribute('d', shapes[1])
                } else {
                    child.setAttribute('d', shapes[0])
                    parent.setAttribute('width', '60%') // width of smaller corners *1,6
                    parent.style.minWidth = '33px'
                    parent.style.maxWidth = '72px'
                }

                child.setAttribute('stroke', 'none')
                child.setAttribute('fill-rule', 'evenodd')


                parent.appendChild(child)

                svgLevel.appendChild(parent)

            }

            if (svgContainer.childElementCount === 0) {
                svgContainer.appendChild(svgLevel)
            } else {
                svgContainer.insertBefore(svgLevel, svgContainer.firstChild);
            }


        }

    }

    randomPattern()

});