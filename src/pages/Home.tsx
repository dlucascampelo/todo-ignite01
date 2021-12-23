import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    const checkTask = tasks.find(item => item.title === newTaskTitle)
    setTasks(oldState => [...oldState, newTask])

    checkTask ?
      // Alert.alert(
      //   'Task já cadastrada',
      //   'Você não pode cadastrar uma task com o mesmo nome.',
      //   [
      //     { text: 'OK' },
      //   ]
      // )
      console.log('Existe task')
      :
      console.log('Não existe task task')

    // setTasks(oldState => [...oldState, newTask])


    console.log(checkTask)

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const item = updatedTasks.find(item => item.id === id)
    if (!item)
      return
    item.done = !item.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?.',
      [
        { text: 'Não' },
        { text: "Sim", onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)) }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const item = updatedTasks.find(item => item.id === taskId)
    if (!item)
      return
    item.title = taskNewTitle
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})