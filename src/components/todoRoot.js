import {
    SimpleGrid, Container, Heading, Input, Center, VStack, StackDivider,
    CardBody, Card, CardFooter, Flex, Spacer, Box, Button, useToast, Grid, GridItem, useColorMode
} from "@chakra-ui/react";
import ListItems from "./list";
import { useEffect, useState } from "react";
import { useTodoListStore } from "../state/store";
import { getUUID } from "../others/utility";


export default function TodoRoot() {
    const toast = useToast();
    const [inputVal, setInputVal] = useState("")
    const [status, setStatus] = useState("All");
    const addItems = useTodoListStore((state) => state.addList)
    const list = useTodoListStore((state) => state.list)
    const removeItems = useTodoListStore((state) => state.deleteAll)
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        toggleColorMode()
    }, [])

    const handleClick = (e) => {
        setStatus(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            if (inputVal) {
                const itemObj = { id: getUUID(), value: inputVal, isSelected: false }
                addItems(itemObj);
                setInputVal("");
            } else {
                toast({
                    title: "Empty text",
                    description: "Input value is empty",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }

        }
    }

    return (
        <Container>
            <Center>
                <Heading>
                    todos
                </Heading>
            </Center>

            <Card>
                <CardBody>
                    <VStack
                        divider={<StackDivider borderColor='gray.200' />}
                        spacing={4}
                        align='stretch'
                    >
                        <Input placeholder='enter todos' size='md' value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)} onKeyDown={handleKeyPress} />
                        <ListItems status={status} />
                    </VStack>

                </CardBody>
                <CardFooter>

                    <Grid templateColumns='repeat(4, 1fr)' gap={10}>
                        <GridItem colSpan={1} h='5'>
                            <Box>Items : {list.length}</Box>
                        </GridItem>
                        <GridItem colSpan={2} h='5'>
                            <Button size='sm' variant='ghost' colorScheme="green" value="Active" onClick={handleClick}>Active</Button>
                            <Button size='sm' variant='ghost' colorScheme="green" value="Completed" onClick={handleClick}>Completed</Button>
                            <Button size='sm' variant='ghost' colorScheme="green" value="All" onClick={handleClick}>All</Button>
                        </GridItem>
                        <GridItem colSpan={1} h='5'>
                            <Center><Button size='sm' variant='ghost' colorScheme="green" onClick={() => removeItems()}>Clear</Button></Center>
                        </GridItem>
                    </Grid>
                </CardFooter>
            </Card>


        </Container>
    )
}