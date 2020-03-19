import React from "react";
import { 
    Box, 
    Flex, 
    useColorMode,
    ThemeProvider,
    CSSReset
} from "@chakra-ui/core";
import UserBio from '../components/UserBio'
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";
import SnippetContext from '../context/SnippetContext'

const snippetPlaceHolder = `
// Using useState hook to store the component state (form data)
const [ formData, setFormData ] = useState({});

// This part handle the state update based on the form data values
// It receive the target element name and value
const handleChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

// The field calling handleChange using onChange event
<Input name="fullname" placeholder="Dan Abramov" onChange={handleChange} />
    `;

const SingleSnippet = (props) => {
    
    const snippetShareId = props.shareId;
    const { colorMode } = useColorMode();
    const disableEdit = true;

    const snippet = {
        title: "Single snippet Title",
        id: "ID",
        description: "When starting an update on the wrong branch, the following sequence allow to leave the branch clean, while moving all changes to the new (correct) branch",
        url: "https://external-linkk.com",
        tags: ["tag1", "tag2", "tag3"],
        content: snippetPlaceHolder,
        isFav: false,
        index: 0
    }

    return (
    <ThemeProvider>
    <CSSReset />
    <Box pt="30px">
    <UserBio />
        <Flex align="center" justifyContent="center" w="100%">
            <Box
            w="90%"
            px={["10px", "10px", "10px", "20px"]}
            borderRadius="10px"
            backgroundColor={
                colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
            }
            mt="50px"
            py="40px"
            >
            <SnippetContext.Provider value={disableEdit}>
                <CodeSnippet
                    index={snippet.index}
                    key={snippet.id}
                    id={snippet.id}
                    title={snippet.title}
                    description={snippet.description}
                    content={snippet.content}
                    tags={snippet.tags}
                    url={snippet.sourceUrl}
                    isFav={snippet.isFav}
                    isArchived={snippet.archivedAt}
                    shareId={snippetShareId}
                />
            </SnippetContext.Provider>
            </Box>
        </Flex>
        <Footer />
    </Box>
    </ThemeProvider>
    );
};

export default SingleSnippet;