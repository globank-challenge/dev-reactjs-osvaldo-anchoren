import React, {type PropsWithChildren, type FC} from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';



export const Pokemon:FC<PropsWithChildren<{title: string, desc: string, image: string}>>  = ({title, desc, image}) => {
    return (
        <Card>
            <Card.Content>
                <Title>{title}</Title>
                <Paragraph>{desc}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: image }} />
        </Card>
    )};

