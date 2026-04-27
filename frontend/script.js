// const urlApi = `http://localhost:3000/`


// async function addTask() {

//     const newTask = {
//         id: -1,
//         name: 'testest 78',
//         desc: 'testeststestsets 78'
//     }

//     try {
        
//         const response = await fetch(urlApi + 'addProduct', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newTask)
//         })
//         if (response.ok) {
//             const data = await response.json()
//         } else {
//             throw new Error(`Error : addTask. Response status : ${response.status}`)
//         }

//     } catch (error) {
//         console.error(error)
//         return
//     }

// }