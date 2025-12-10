import { Children } from "react";
import { Card, CardBody } from "@chakra-ui/react";

export default function AuthCard({children})
{
    return (
      <Card.Root width="320px"  bg="grey">
        <Card.Header />
        <Card.Body>
          {/* <Card.Title color='black'>{title}</Card.Title> */}
          {children}
        </Card.Body>
        <Card.Footer />
      </Card.Root>
    );
}
