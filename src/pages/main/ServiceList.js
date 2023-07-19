import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ServiceListItem from "./ServiceListItem";

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px;
`;

function ServiceList(props) {
    const {service, onClickItem} = props;
    return (
        <Wrapper>
            {service.map((item) => {
                return (
                    <ServiceListItem
                        item={item}
                        onClick={() => {
                            onClickItem(item);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}

export default ServiceList;