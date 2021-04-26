const track = document.querySelector('.carousel__track'); //este comando buscara en mis documentos aquel que tenga la clase .carousel__track
const slides = Array.from(track.children); //definimos nuestros slides, podemos definir a c/u de ellos, pero es mejor definirlos con un array
const nextButton = document.querySelector('.carousel__button--right');//con el querySelector debemos llamar a la clase mediante el '.class'
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children);

//otro aspecto importante que debemos tener en cuenta es el tamanio de las imagenes y debemos tenerlo definido ya que va a depender de si la pantalla
//de nuestro dispositivo es mas grande o mas pequenia. El caso es que va a depender del width de nuestra variable track "const track = document.querySelector('.carousel__track');"
const slideWidth = slides[0].getBoundingClientRect().width;//getBoundingClientRect nos indica las coordenadas de los ejes Y y X asi como las alturas y anchuras de las imagenes con respecto al tamanio actual de la pantalla.
//indicando .width al final de nuestro string nos indica el width del slide en el que estamos parados de acuerdo al width de la pantalla.
//console.log(slideWidth)

//debemos arreglar los slides uno proximo al otro
//slides[0].style.left = slideWidth * 0 + 'px'; para hacer este arrangement podemos hacerlo de esta forma, definiendo a cada slide de manera individual.
//slides[1].style.left = slideWidth * 1 + 'px'; lo que podemos hacer para hacerlo mas practico es crear un LOOP, el loop hara lo mismo pero lo hara por si mismo
//slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition); //por cada slide indexa el numero de veces que exista un slide comenzando por 0, de esta manera podemos hacer lo mismo con menos codigo y podemos insertar los slides que queramos y se actualizarian automaticamente.

//cuando se hace click al boton izq, slide se mueve a la izq



//cuando se hace click al boton der, slide se mueve a la derecha
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left //con esto podemos saber el espacio que hay entre un slide y otro, de esta manera sabemos cuantos px se debe mover un slide al otro
  //mover al siguiente slide
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide'); //en este caso solo utilizamos el nombre de la clase sin el punto como aparece escrito en el codigo.
  nextSlide.classList.add('current-slide');

})



//cuando se hace click al nav del carousel, este se mueve al que pertenezca (izq o der)
