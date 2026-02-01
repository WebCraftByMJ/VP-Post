// Global variables
let videoPlayed = false;
let soundEnabled = true;

// Initialize floating hearts on page load
window.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  setupSoundToggle();
});

// Create floating hearts animation
function createFloatingHearts() {
  const heartsContainer = document.getElementById('heartsContainer');
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 8000);
  }, 500);
}

// Sound toggle functionality
function setupSoundToggle() {
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    
    // Mute/unmute any playing audio or video
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
      element.muted = !soundEnabled;
    });
  });
}

// Confetti effect
function createConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 150;
  const colors = ['#ff4d79', '#ff1744', '#ff80ab', '#ffb3c1', '#ffd54f', '#ff6f00'];
  const hearts = ['❤️', '💕', '💖', '💗', '✨', '🌟'];
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.speed = Math.random() * 3 + 2;
      this.radius = Math.random() * 4 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.heart = hearts[Math.floor(Math.random() * hearts.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 10 - 5;
      this.isEmoji = Math.random() > 0.5;
    }
    
    update() {
      this.y += this.speed;
      this.rotation += this.rotationSpeed;
      if (this.y > canvas.height) {
        this.y = -20;
        this.x = Math.random() * canvas.width;
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      
      if (this.isEmoji) {
        ctx.font = `${this.radius * 5}px Arial`;
        ctx.fillText(this.heart, 0, 0);
      } else {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }
  
  animate();
  
  setTimeout(() => {
    canvas.style.display = 'none';
  }, 5000);
}

// Main show message function
function showMessage(response) {
  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    // Set the button position to absolute (only once)
    if (noButton.style.position !== "absolute") {
      noButton.style.position = "absolute";
      
      // Change the image source to "gun.gif"
      const imageElement = document.getElementsByClassName("image")[0];
      imageElement.src = "images/gun.gif";
      imageElement.style.transform = "scale(1.1)";

      // Update text content and hide the name message
      const questionElement = document.getElementById("question");
      questionElement.textContent = "Choose wisely... 😈";
      questionElement.style.animation = "pulse 0.5s ease";
      document.getElementById("name").style.display = "none";

      // Make "Yes" button even more attractive
      const yesButton = document.getElementById("yesButton");
      yesButton.style.transform = "scale(1.2)";
      yesButton.style.animation = "pulse 0.8s ease-in-out infinite";
    }

    // Generate random coordinates within the visible container
    const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

    // Apply the new coordinates to the button with smooth transition
    noButton.style.transition = "all 0.3s ease";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";

    // Add mouseover event listener only once
    if (!noButton.dataset.hasListener) {
      noButton.dataset.hasListener = "true";
      
      noButton.addEventListener("mouseover", () => {
        if (!videoPlayed && soundEnabled) {
          const videoElement = document.createElement("video");
          videoElement.src = "./Maroon 5 - Sugar.mp4#t=42";
          videoElement.autoplay = true;
          videoElement.controls = false;
          videoElement.muted = !soundEnabled;
          videoElement.style.position = "fixed";
          videoElement.style.top = "40%";
          videoElement.style.left = "50%";
          videoElement.style.transform = "translate(-50%, -50%)";
          videoElement.style.width = "min(700px, 90vw)";
          videoElement.style.maxHeight = "60vh";
          videoElement.style.borderRadius = "20px";
          videoElement.style.boxShadow = "0 10px 40px rgba(0,0,0,0.5)";
          videoElement.style.zIndex = "500";
          document.body.appendChild(videoElement);
          videoPlayed = true;
        }

        // Generate new random coordinates when the button is hovered
        const newRandomX = Math.max(0, Math.floor(Math.random() * maxWidth));
        const newRandomY = Math.max(0, Math.floor(Math.random() * maxHeight));

        noButton.style.zIndex = "100";
        noButton.style.left = newRandomX + "px";
        noButton.style.top = newRandomY + "px";
        
        // Shake effect on the whole prompt
        document.querySelector('.Mainprompt').style.animation = "moveNoMessage 0.3s linear";
      });
    }
  }

  if (response === "Yes") {
    // Trigger confetti
    createConfetti();
    
    // Remove the name message and the "No" button with fade out
    const nameElement = document.getElementById("name");
    const noButton = document.getElementById("no-button");
    const yesButton = document.getElementById("yesButton");
    
    if (nameElement) {
      nameElement.style.transition = "opacity 0.5s";
      nameElement.style.opacity = "0";
      setTimeout(() => nameElement.remove(), 500);
    }
    
    if (noButton) {
      noButton.style.transition = "opacity 0.5s";
      noButton.style.opacity = "0";
      setTimeout(() => noButton.remove(), 500);
    }
    
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.pause();
      videoElement.remove();
    }

    // Create an audio element to play the sound
    if (soundEnabled) {
      const audioElement = document.createElement("audio");
      audioElement.src = "./Minions Cheering.mp3";
      audioElement.preload = "auto";
      audioElement.muted = !soundEnabled;
      audioElement.play()
        .catch(e => console.error("Audio playback failed:", e));
    }

    // Update the text content with direct display (no typing effect)
    const yesMessage = document.getElementById("question");
    yesMessage.textContent = "🎉 Yay! See you on the 14th, my princess! 💕";
    yesMessage.style.display = "block";
    yesMessage.style.fontStyle = "normal";
    yesMessage.style.whiteSpace = "normal";
    yesMessage.style.wordBreak = "break-word";
    
    // Change image to dance gif
    const imageElement = document.getElementsByClassName("image")[0];
    imageElement.src = "images/dance.gif";
    imageElement.style.transform = "scale(1.1)";
    imageElement.style.animation = "pulse 1s ease-in-out infinite";

    // Remove the "Yes" button with celebration
    if (yesButton) {
      yesButton.style.transition = "all 0.5s";
      yesButton.style.transform = "scale(1.5) rotate(360deg)";
      yesButton.style.opacity = "0";
      setTimeout(() => yesButton.remove(), 500);
    }
    
    // Add celebration effect to the main prompt
    const mainPrompt = document.querySelector('.Mainprompt');
    mainPrompt.style.animation = "pulse 1s ease-in-out 3";
  }

}
