import {
    List,
    ListItem,
    ListIcon,
    Checkbox, CloseButton, Box
} from '@chakra-ui/react'
import { MdSettings, MdCheckCircle } from 'react-icons/md'
import { useTodoListStore } from '../state/store';

export default function ListItems({ status }) {
    const items = useTodoListStore((state) => state.list)
    const addSelected = useTodoListStore((state) => state.modifySelected);
    // console.log(status)
    const handleClick = (index) => {
        addSelected(index);
        console.log(items);
    }

    switch (status) {
        case 'Active': {
            const elemts = items.filter(item => !item.isSelected)
            return (
                <List spacing={3}>
                    {elemts.length > 0 && elemts.map((elemt, index) => {
                        return <ListItem key={index}>
                            <Box>
                                <Checkbox spacing='1rem' size='md' colorScheme='green' isChecked={elemt.isSelected} onChange={() => handleClick(elemt.id)}>{elemt.value}</Checkbox>
                            </Box>
                        </ListItem>
                    })}
                </List>
            )
        }
            break;
        case 'Completed': {
            const elemts = items.filter(item => item.isSelected)
            return (
                <List spacing={3}>
                    {elemts.length > 0 && elemts.map((elemt, index) => {
                        return <ListItem key={index}>
                            <Box>
                                <Checkbox spacing='1rem' size='md' colorScheme='green' isChecked={elemt.isSelected} onClick={() => handleClick(elemt.id)}>{elemt.value}</Checkbox>
                            </Box>
                        </ListItem>
                    })}
                </List>
            )
        }
            break;
        default:
        case 'All': {
            return (
                <List spacing={3}>
                    {items.length > 0 && items.map((item, index) => {
                        return <ListItem key={index}>
                            <Box>
                                <Checkbox spacing='1rem' size='md' colorScheme='green' isChecked={item.isSelected} onChange={() => handleClick(item.id)}>{item.value}</Checkbox>
                            </Box>
                        </ListItem>
                    })}
                </List>
            )
        }
    }
}