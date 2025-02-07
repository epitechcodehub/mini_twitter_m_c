import { View, Alert, Button } from "react-native"
import axios from "axios";

export default function Home() {

    const [url, setUrl] = useState('');

    const createDatabaseEntry = async () => {
      try {
        const response = await axios.post('http://10.106.1.116:3000/', {
            user_name: "ajax",
            url_photo: url,
            content: "c'est une photo"
        });
          console.log('Database entry created:', response.data);
        Alert.alert('Success', 'Database entry created successfully');
      } catch (error) {
        console.error('Error creating database entry:', error);
        Alert.alert('Error', 'Failed to create database entry');
      }
    };
}
