'use client'

import React, {useEffect, useState} from "react";
import { firestore } from "@/firebase/clientApp";
import {Button, Modal, Box, Typography, TextField, Grid, Stack} from "@mui/material";
import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc} from "@firebase/firestore";

const db = firestore;

export default function HomePage() {

    const [inventory, setInventory] = useState<Array<any>>([]);
    const [itemName, setItemName] = useState<string>('Item');
    const [quantity, setQuantity] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);

    // CRUD functionality
    // add items to db
    const updateInventory = async () => {
        // get the snapshot of the collection
        const snapshot = query(collection(db, 'inventory'));
        const docs = await getDocs(snapshot);
        const inventoryList: any[] = [];

        // iterate over every item in the db and add to list
        docs.forEach((document) => {
            inventoryList.push({
                name: document.id,
                ...document.data()
            });
        });
        setInventory(inventoryList); // state function
    }

    // useEffect is used to update the page when it loads because we need to display all the items from the database
    useEffect(() => { updateInventory(), [] });

    // delete items from db
    const removeItem = async (userItem: string) => {
        const docRef = doc(collection(db, 'inventory'), userItem);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const { quantity } = docSnapshot.data();

            // If quantity is only one and we delete, delete item from the db
            if (quantity === 1) {
                await deleteDoc(docRef);
            } else {
                await setDoc(docRef, {quantity: quantity - 1});
            }
        }
        await updateInventory();
    }

    const addItem = async (userItem: string, userQuantity: number) => {

        console.log("userItem: " + userItem);
        console.log("userQuantity: " + userQuantity);
        const docRef = doc(collection(db, 'inventory'), userItem);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const { quantity } = docSnapshot.data();
            await setDoc(docRef, {quantity: quantity + userQuantity});
        } else {
            await setDoc(docRef, { name: userItem, quantity: userQuantity });
        }

        await updateInventory();
    }

    // Modal functions
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }

    // UI
    return (
      <>
      <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center' gap={2} flexDirection='column'>
          <Modal open={open} onClose={handleClose}>
              <Box position='absolute'
                   top='50%'
                   left='50%'
                   sx={{
                       transform: 'translate(-50%, -50%)',
                   }}
                   width={400}
                   bgcolor='white'
                   border='2px solid black'
                   boxShadow={24}
                   p={4}
                   display='flex'
                   flexDirection='column'
                   gap={3}>
                  <Typography variant='h5'>Add item</Typography>

                  <Grid container spacing={2}>
                      <Grid item xs={8}>
                          <TextField
                              variant='outlined'
                              fullWidth
                              value={itemName}
                              onChange={(e) => {
                                  const value = e.target.value;
                                  setItemName(value);
                              }}
                          />
                      </Grid>
                      <Grid item xs={4}>
                          <TextField
                              variant='outlined'
                              fullWidth
                              value={quantity}
                              onChange={(e) => {
                                  const value = e.target.value;
                                  setQuantity(Number(value)); // Convert to number or keep empty string
                              }}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Button
                              variant='outlined'
                              fullWidth
                              onClick={ async () => {
                                await addItem(itemName, quantity);
                                setItemName('');
                                setQuantity(0);
                                handleClose();
                                await updateInventory();
                              }
                          }
                          >
                              Add / Edit Item
                          </Button>
                      </Grid>
                  </Grid>
              </Box>
          </Modal>
          <Typography variant='h1'>Inventory Management</Typography>
          <Button
            variant='contained'
            onClick={()=> {
                handleOpen();
            }}
          >
              Add / Edit Item
          </Button>

        <Box border="1px solid #333"
             width='800px'
             height='100px'
             bgcolor='#ADD8E6'
             display='flex'
             p='10px'

             justifyContent='center'
        >
            <Typography variant='h2' color='#333'>
                Inventory Items
            </Typography>
        </Box>

          <Stack width='700px' height='200px' spacing={2} display='flex' alignItems='center' justifyContent='column'>
              {inventory.map(({ name, quantity }) => (
                  <Box
                      key={name}
                      width='100%'
                      minHeight='150px'
                      display='flex'
                      alignItems='center'
                      justifyContent='space-between'
                      bgcolor='#f0f0f0'
                      padding={3}
                      borderRadius='10px'
                  >
                      <Typography variant='h5' color='#333'>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>

                      <Typography variant='h5' color='#333'>
                          {quantity}
                      </Typography>

                      <Box display='flex' alignItems='center'>
                          <Button variant='outlined' size='small' onClick={ async () => {
                              await addItem(name, 1);
                          }} sx={{ marginRight: 1 }}>+</Button>
                          <Button variant='outlined' size='small' onClick={ async () => {
                              await removeItem(name);
                          }} sx={{ marginLeft: 1 }}>-</Button>
                      </Box>
                  </Box>
              ))}
          </Stack>
      </Box>
    </>
    );
}
