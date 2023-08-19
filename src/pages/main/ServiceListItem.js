import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from 'react-router-dom';

const Item = styled.button`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 80px;
    margin: 20px 10px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 7px;

    & > small {
        font-size: 12px;
    }

    & > img {
        border-radius: 10px;
    }

    /* Initially hide ToolTip */
    & > span {
        visibility: hidden;
        position: absolute;
        width: 230%;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 5px;
        font-size: 12px;
        opacity: 0;
        white-space: normal; /* Allow line breaks */
        text-overflow: ellipsis; /* Show ellipsis if text overflows */
        word-wrap: break-word; /* Break words if they exceed max-width */
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 10;

        &::before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top-color: rgba(0, 0, 0, 0.8);
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    /* Show ToolTip on hover */
    &:hover > span {
        visibility: visible;
        opacity: 1;
    }
`;

function ServiceListItem(props) {
    const { item } = props;
    const navigate = useNavigate();

    const serviceClickHandler = () => {
        navigate(`${item.t_service_path}`);
    }

    return (
        <Item onClick={serviceClickHandler}>
            <img src={item.t_service_main_icon_path} alt="서비스 이미지" width="80px" height="80px"/>
            <small>{item.t_service_name}</small>
            <span className="Tooltip">{item.t_service_description}</span>
        </Item>
    );
}

export default ServiceListItem;