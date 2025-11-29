const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve assets so the illustration still loads
app.use('/assets', express.static('assets'));

const page = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ryan Barlan - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
            background: radial-gradient(circle at center, #5459AC 0%, #393D7E 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Name */
        .name-3d-wrapper {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            text-align: center;
            pointer-events: none;
        }

        .greeting {
            display: block;
            font-size: 2rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 0.3rem;
            margin-top: -50px;
            margin-left: -900px;
            margin-bottom: 0.5rem;
            text-shadow:
                2px 2px 4px rgba(0, 0, 0, 0.2),
                0 0 5px rgba(255, 255, 255, 0.1);
            white-space: nowrap;
        }

        .name-3d {
            font-size: 10rem;
            font-weight: bold;
            color: #F2AEBB;
            text-transform: uppercase;
            letter-spacing: 0.5rem;
            margin-top: -35px;
            white-space: nowrap;
            text-shadow:
                3px 3px 0px rgba(0, 0, 0, 0.2),
                6px 6px 0px rgba(0, 0, 0, 0.15),
                0 0 10px rgba(242, 174, 187, 0.3);
            transform: perspective(500px) rotateX(15deg);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Image Wrapper */
        .image-wrapper {
            position: relative;
            z-index: 10;
            transition: transform 0.3s ease-out;
        }

        .profile-image {
            width: 750px;
            margin-top: 120px;
            height: auto;
            display: block;
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
            transition: transform 0.1s ease-out;
        }

        /* Floating Text Styles */
        .text-left,
        .text-right {
            position: absolute;
            z-index: 5;
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            pointer-events: none;
        }

        .text-left {
            left: 25%;
            top: 50%;
            transform: translateY(-50%);
            white-space: nowrap;
        }

        .text-right {
            right: 14%;
            top: 65%;
            transform: translateY(-50%);
            text-align: right;
            line-height: 1.6;
            max-width: 500px;
        }

        /* Floating Animation */
        @keyframes float {
            0%, 100% {
                transform: translateY(-50%) translateY(0);
            }
            50% {
                transform: translateY(-50%) translateY(-10px);
            }
        }

        .text-left.floating {
            animation: float 3s ease-in-out infinite;
        }

        @keyframes floatRight {
            0%, 100% {
                transform: translateY(-50%) translateY(0);
            }
            50% {
                transform: translateY(-50%) translateY(10px);
            }
        }

        .text-right.floating {
            animation: floatRight 3.5s ease-in-out infinite;
            animation-delay: 0.5s;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .name-3d-wrapper {
                top: 10%;
            }

            .greeting {
                font-size: 1.2rem;
                letter-spacing: 0.2rem;
            }

            .name-3d {
                font-size: 4rem;
                letter-spacing: 0.3rem;
            }

            .profile-image {
                width: 450px;
            }

            .text-left,
            .text-right {
                font-size: 1rem;
            }

            .text-left {
                left: 5%;
                top: 45%;
            }

            .text-right {
                right: 5%;
                top: 60%;
                max-width: 150px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Name -->
        <div class="name-3d-wrapper">
            <div class="greeting">Hi, I'm</div>
            <h1 class="name-3d">RYAN BARLAN</h1>
        </div>

        <!-- Image -->
        <div class="image-wrapper">
            <img src="/assets/vector1.png" alt="Ryan Barlan" id="hoverImage" class="profile-image" />
        </div>

        <!-- Section -->
        <div class="text-left floating">
            <p>BSIT BA-4101</p>
        </div>

        <!-- Qoute -->
        <div class="text-right floating">
            <p>The expert in anything<br>was once a beginner.</p>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const image = document.getElementById('hoverImage');
            const imageWrapper = document.querySelector('.image-wrapper');
            const maxMoveDistance = 30;
            let imageCenterX = 0;
            let imageCenterY = 0;

            function updateImageCenter() {
                const rect = imageWrapper.getBoundingClientRect();
                imageCenterX = rect.left + rect.width / 2;
                imageCenterY = rect.top + rect.height / 2;
            }

            updateImageCenter();
            window.addEventListener('resize', updateImageCenter);

            document.addEventListener('mousemove', (e) => {
                const deltaX = e.clientX - imageCenterX;
                const deltaY = e.clientY - imageCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                let moveX = deltaX;
                let moveY = deltaY;

                if (distance > maxMoveDistance) {
                    moveX = (deltaX / distance) * maxMoveDistance;
                    moveY = (deltaY / distance) * maxMoveDistance;
                }

                image.style.transform = 'translate(' + (moveX * 0.3) + 'px, ' + (moveY * 0.3) + 'px)';
            });

            document.addEventListener('mouseleave', () => {
                image.style.transform = 'translate(0, 0)';
            });

            document.addEventListener('mouseout', (e) => {
                if (!e.relatedTarget && !e.toElement) {
                    image.style.transform = 'translate(0, 0)';
                }
            });
        });
    </script>
</body>
</html>`;

app.get('/', (req, res) => {
    res.send(page);
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});

