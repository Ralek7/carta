document.addEventListener("DOMContentLoaded", function () {
    const heartsContainer = document.querySelector(".hearts-container");
    const botonNo = document.getElementById("botonNo");
    const botonSi = document.getElementById("botonSi");
    
    // Función corazones flotantes
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    setInterval(createHeart, 300);

    // Comportamiento botón No
    if (!('ontouchstart' in window)) {
        botonNo.addEventListener("mouseover", function () {
            const maxX = window.innerWidth - botonNo.offsetWidth - 20;
            const maxY = window.innerHeight - botonNo.offsetHeight - 20;
            botonNo.style.position = "absolute";
            botonNo.style.left = Math.random() * maxX + "px";
            botonNo.style.top = Math.random() * maxY + "px";
        });
    }

    // Confeti multicolor (FIXED)
    const coloresConfeti = [
        '#ff69b4', '#ff1493', '#ffcccb', 
        '#ff9999', '#ffebf3', '#ff7f50', 
        '#ffd700', '#98fb98', '#87cefa'
    ];

    function crearConfeti() {
        const confeti = document.createElement("div");
        confeti.className = "confeti";
        confeti.style.backgroundColor = coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)];
        confeti.style.left = Math.random() * 100 + "vw";
        confeti.style.transform = `scale(${Math.random() + 0.5}) rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 3000);
    }

    // Generador de PDF corregido
    function generarPDF() {
        const doc = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a5'
        });
        
        // Texto en cursiva
        doc.setFontSize(28);
        doc.setTextColor(255, 105, 180);
        doc.text("Carta para Ti", 60, 20, { align: "center" });

        // Configuración de fuente segura
        doc.setFont("helvetica", "italic");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        
        // Texto con formato correcto
        const texto = [
            "Lau:",
            "Desde que llegaste a mi vida, cada momento contigo",
            "es un regalo. Tu sonrisa ilumina mis días y tu",
            "forma de ser hace que todo sea mejor.",
            "¿Aceptas ser mi San Valentín?",
            "Con todo mi cariño,",
            "Alex"
        ];
        
        doc.text(texto, 15, 30, { maxWidth: 120 });
        doc.save('carta.pdf');
    }

    // Evento botón Sí (FIXED - CONFETI + PDF)
    botonSi.addEventListener("click", function () {
        // Lanzar confeti
        for(let i = 0; i < 50; i++) {
            setTimeout(crearConfeti, Math.random() * 500);
        }
        
        // Generar PDF después de 1 segundo
        setTimeout(generarPDF, 1000);
    });

    // Manejo móvil
    if ('ontouchstart' in window) {
        botonNo.style.position = "static";
        botonNo.addEventListener('touchstart', function(e) {
            e.preventDefault();
            alert("😏 ¿Segura? Intenta de nuevo...");
        });
    }
});
