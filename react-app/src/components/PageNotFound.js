import React from 'react'
import '../styles/NotFound.css';
import NotFound from '../assests/404error.jpg';

function PageNotFound(props) {
  return (
    <section className='notFound'>
      <header className='notFound_head'>Error 404: Page not found</header>
      <div className='notFound_body'>
        <picture className='notFound_body_image'>
          <img src={NotFound} alt='Not Found' />
        </picture>
        <article className='notFound_body_details'>
          <div className='notFound_body_title'>Sorry</div>
          <div className='notFound_body_description'>
            The page you are looking for might be removed or is temporarily
            unavailable, click hompage button &darr; to go back.
          </div>
          <button
            className='notFound_body_button'
            onClick={() =>
              window.location.replace(
                'http://localhost:3000/'
              )
            }
          >
            Back to Homepage
          </button>
        </article>
      </div>
    </section>
  );
}

PageNotFound.propTypes = {};

export default PageNotFound;