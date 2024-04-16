import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../services/newsServices";
import Swal from 'sweetalert2';

const StyledCard = styled.div`

  display: flex;
  align-items: center;
  border: 1px solid #B19470;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 0px lightgray;  
  padding: 2%;
  margin: 10px;
  width: 80vw;
  box-sizing: content-box;
  max-width: 550px;

  @media screen and (max-width: 768px) {
    width: 420px;
    padding-right: 2%;
  }
  @media screen and (max-width: 480px) {
    width: 320px;
  }

  @media screen and (max-width: 360px) {
    width: 250px;
  }
`
const SculptureImage = styled.div`
  width: 100%;
  display: flex;
`
const Frame = styled.img`
  width: 100%;
  aspect-ratio: 5/7.2;
  object-fit: cover;
`
const MoreDetails = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Card = ({ news }) => {
    if (!news) {
        return <div>Loading...</div>; // O cualquier otro componente de carga
    }
    
    const { id, title, content, date, image } = news;
    console.log(news)
    const navigate = useNavigate();

  return (
    
    <StyledCard key={id}>
    <SculptureImage style={{background: `url(${image}) center/cover no-repeat`}}>
      <Frame src='src/assets/frame.png' alt={title} />
    </SculptureImage>

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "86%", margin: '0 3% 0'}}>
      <section>
        
        <h3>{title}</h3>
        
        <h4>Content: {content}</h4>
        
        <MoreDetails>
          <p>Date: {date}</p>
        </MoreDetails>
      
      </section>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5%"}}>
      

          <button onClick={() => navigate(`EditPost/${id}`)} className="button" style={{ backgroundColor: "#000000" }}>Modificar</button>
          <button onClick={() => navigate(`Article/${id}`)} className="button" style={{ backgroundColor: "#000000" }}>Ver noticia</button>
        
      
        <button className="button" style={{ backgroundColor: "#500707" }} onClick={() => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id).then(() => {
          Swal.fire(
            'La noticia ha sido eliminada con éxito.',
          );
          navigate('/home');
        }).catch((error) => {
          Swal.fire(
            'Hubo un problema al eliminar la noticia.',
          );
        });
      }
    });
 }}>Eliminar</button>
      
      </div>
    
    </div>

  </StyledCard>

  )
}

export default Card