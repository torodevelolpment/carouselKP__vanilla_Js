  const track = document.querySelector('.carousel__track'); //este comando buscara en mis documentos aquel que tenga la clase .carousel__track
const slides = Array.from(track.children); //definimos nuestros slides, podemos definir a c/u de ellos, pero es mejor definirlos con un array
const nextButton = document.querySelector('.carousel__button--right');//con el querySelector debemos llamar a la clase mediante el '.class'
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

/*otro aspecto importante que debemos tener en cuenta es el tamanio de las imagenes y debemos tenerlo definido ya que va a depender de si la pantalla
de nuestro dispositivo es mas grande o mas pequenia. El caso es que va a depender del width de nuestra variable track "const track = document.querySelector('.carousel__track');"*/
const slideWidth = slides[0].getBoundingClientRect().width;/*getBoundingClientRect nos indica las coordenadas de los ejes Y y X asi como las alturas y anchuras de las imagenes con respecto al tamanio actual de la pantalla.
indicando .width al final de nuestro string nos indica el width del slide en el que estamos parados de acuerdo al width de la pantalla.*/


//debemos arreglar los slides uno proximo al otro
//slides[0].style.left = slideWidth * 0 + 'px'; para hacer este arrangement podemos hacerlo de esta forma, definiendo a cada slide de manera individual.
//slides[1].style.left = slideWidth * 1 + 'px'; lo que podemos hacer para hacerlo mas practico es crear un LOOP, el loop hara lo mismo pero lo hara por si mismo
//slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition); //por cada slide indexa el numero de veces que exista un slide comenzando por 0, de esta manera podemos hacer lo mismo con menos codigo y podemos insertar los slides que queramos y se actualizarian automaticamente.

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
currentDot.classList.remove('current-slide');
targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1 ) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

//cuando se hace click al boton izq, slide se mueve a la izq
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide')
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex)
});


//cuando se hace click al boton der, slide se mueve a la derecha
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide,nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex)
});

//const amountToMove = nextSlide.style.left //con esto podemos saber el espacio que hay entre un slide y otro, de esta manera sabemos cuantos px se debe mover un slide al otro

//mover al siguiente slide
//track.style.transform = 'translateX(-' + amountToMove + ')';
//currentSlide.classList.remove('current-slide'); //en este caso solo utilizamos el nombre de la clase sin el punto como aparece escrito en el codigo.
//nextSlide.classList.add('current-slide');

/*podemos utilizar este mismo codigo para hacer que el boton izq cumpla la funcion de ir o regresar hacia la izq, pero en vez de hacerlo de esa manera
podemos crear una funcion que reutilice el codigo que acabamos de escribir para el boton derecho*/

//cuando se hace click al nav del carousel, este se mueve al que pertenezca (izq o der)
dotsNav.addEventListener('click', e => {
  //cual indicador esta clickado? aqui lo que hacemos es que la informacion recibida por el buscador sea solo aplicada al boton y no a cualquier otra area del div donde se encuentran los botones
  const targetDot = e.target.closest('button');

  if (!targetDot) return; //return en una funcion significa que la funcion debe parar al recibir un false statement, simplemente toda accion fuera de los botones el navegador no lo leera
  
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots. findIndex(dot => dot === targetDot);
  const targetSlide = slides [targetIndex];

  moveToSlide(track, currentSlide,targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
  

  
 
})
