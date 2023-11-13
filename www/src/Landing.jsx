import React from 'react'
import sfondo_banner from './static/sfondo-banner.jpg'
import sfondo_banner2 from './static/sfondo-banner2.jpg'
import logo from './static/logo.png'
import './static/landing.css'
import image2 from './static/image2.png'
import image3 from './static/image3.png'
import carousel from './static/carousel-prova.png'
import RenderList from './utils/RenderList'
import { URL } from './index'
import { Link } from 'react-router-dom'

export const Landing = () => {
  const data = RenderList(URL+'session_data');

  return (
    <div>
      <nav class="navbar navbar-expand-lg position-fixed w-100">
      <div class="container-fluid">
      <img src={logo} alt="Bootstrap" width="30" height="30"/>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
{/*Start Banner */}
<div class="banner">
  <img src={sfondo_banner} class="w-100"/>
  <div class="center">
    <h1 class="fade-in-1">IwappCRM</h1>
    <h2 class="fade-in-2">Unisci a noi</h2>
    {data.loggedIn===true ? 
    <Link  class="btnn fade-in-3" to="/leads">Inizia Ora</Link>
    :
    <Link  class="btnn fade-in-3" to="/login">Registrati</Link>
    }
    
  </div>
</div>
{/*End Banner */}
<div class="container">

{/*start cards */}
<div class="container px-5 py-5" id="featured-3">
    <h2 class="pb-2 border-bottom text-center">Vantaggi</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          <svg class="bi" width="1em" height="1em"><use href="#collection"></use></svg>
        </div>
        <h3 class="fs-4">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
          <svg class="bi"><use href="#chevron-right"></use></svg>
        </a>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          <svg class="bi" width="1em" height="1em"><use href="#people-circle"></use></svg>
        </div>
        <h3 class="fs-4">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
          <svg class="bi"><use href="#chevron-right"></use></svg>
        </a>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          <svg class="bi" width="1em" height="1em"><use href="#toggles2"></use></svg>
        </div>
        <h3 class="fs-4">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
          <svg class="bi"><use href="#chevron-right"></use></svg>
        </a>
      </div>
    </div>
  </div>{/*end cards */}

{/*start features */}
  <div class="container col-md-12 px-2">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src={image2} class="d-block mx-lg-auto img-fluid floating" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h2 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h2>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" class="btnn btn-primary px-4 me-md-2">Primary</button>
          <button type="button" class="btnn btn-outline-secondary px-4">Default</button>
        </div>
      </div>
    </div>
  </div>
  {/*end features */}
  <h2 class="pb-2 border-bottom text-center responsive-hide"></h2>
  {/*start features 2 */}
  <div class="container col-md-12 px-2">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
     
      <div class="col-lg-6">
        <h2 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h2>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" class="btnn btn-primary px-4 me-md-2">Primary</button>
          <button type="button" class="btnn btn-outline-secondary px-4">Default</button>
        </div>
      </div>
      <div class="col-10 col-sm-8 col-lg-6">
        <img src={image3} class="d-block mx-lg-auto img-fluid floating" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
    </div>
  </div>
  {/*end features 2*/}

  {/*Start Carousel*/}
  <div class="mt-5 mb-5">
    
      <h2 class="pb-2 border-bottom text-center">Anteprime</h2>
    <div id="carouselExampleIndicators" class="mt-3 mb-5 carousel carousel-dark slide w-75 mx-auto">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src={carousel} class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <img src={carousel} class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <img src={carousel} class="d-block w-100" alt="..."/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
  {/*End Carousel */}

  {/*Starta Pricing */}
  <h2 class="pb-2 border-bottom text-center pt-5">Pacchetti</h2>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center pt-5 px-5">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Free</h4>
          </div>
          <div class="card-body">
            <h2 class="card-title pricing-card-title">$0<small class="text-body-secondary fw-light">/mo</small></h2>
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btnn btn-lg btn-outline-primary">Sign up for free</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Pro</h4>
          </div>
          <div class="card-body">
            <h2 class="card-title pricing-card-title">$15<small class="text-body-secondary fw-light">/mo</small></h2>
            <ul class="list-unstyled mt-3 mb-4">
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btnn btn-lg btn-primary">Get started</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm border-primary">
          <div class="card-header py-3 text-bg-primary border-primary">
            <h4 class="my-0 fw-normal">Enterprise</h4>
          </div>
          <div class="card-body">
            <h2 class="card-title pricing-card-title">$29<small class="text-body-secondary fw-light">/mo</small></h2>
            <ul class="list-unstyled mt-3 mb-4">
              <li>30 users included</li>
              <li>15 GB of storage</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btnn btn-lg btn-primary">Contact us</button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive px-5">
      <table class="table text-center">
        <thead>
          <tr>
            <th style={{width: "34%"}}></th>
            <th style={{width: "22%"}}>Free</th>
            <th style={{width: "22%"}}>Pro</th>
            <th style={{width: "22%"}}>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-start">Public</th>
            <td>+</td>
            <td>+</td>
            <td>+</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Private</th>
            <td></td>
            <td>+</td>
            <td>+</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Permissions</th>
            <td>+</td>
            <td>+</td>
            <td>+</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Sharing</th>
            <td></td>
            <td>+</td>
            <td>+</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Unlimited members</th>
            <td></td>
            <td>+</td>
            <td>+</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Extra security</th>
            <td></td>
            <td></td>
            <td>+</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/*End Pricing */}

</div>

{/*Start Banner2 */}
<div class="banner mt-5">
  <img src={sfondo_banner2} class="w-100"/>
  <div class="center-2">
    <h2 class="text-secondary fs-1 fw-bolder">Scegli il meglio</h2>
    {data.loggedIn===true ? 
    <Link  class="btnn" to="/leads">Inizia Ora</Link>
    :
    <Link  class="btnn" to="/login">Registrati</Link>
    }
    
  </div>
</div>
{/*End Banner2 */}

{/*Start Footer */}
<footer class="d-flex flex-wrap justify-content-between align-items-center px-3 py-3 border-top">
    <p class="col-md-4 mb-0 text-body-secondary">© 2023 Iwapp, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img src={logo} class="bi me-2" width="50" height="50"></img>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
    </ul>
  </footer>
  {/*End Footer */}
    </div>
  )
}
