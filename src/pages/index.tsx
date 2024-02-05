import DynamicForm from '@/components/DynamicForm';

const fieldData = {
  data: [
    {
      id: 1,
      name: "Full Name",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 100,
      defaultValue: "hithesh svsk",
      required: true
    },
    {
      id: 2,
      name: "Email",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 50,
      defaultValue: "hithesh.svsk@mail.com",
      required: true
    },
    {
      id: 6,
      name: "Gender",
      fieldType: "LIST",
      defaultValue: "Male",
      required: true,
      listOfValues: ["Male", "Female", "Others"]
    },
    {
      id: 7,
      name: "Love React?",
      fieldType: "RADIO",
      defaultValue: "Yes",
      required: true,
      listOfValues: ["Yes", "No"]
    }
  ]
};

const MyPage = () => {
  return <DynamicForm fields={fieldData.data} />;
};

export default MyPage;
