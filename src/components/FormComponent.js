import 'semantic-ui-css/semantic.min.css';
import { Input, TextArea, Form, Button } from 'semantic-ui-react';

const FormComponent = ({formPost, onChange, onSubmit}) => {
    return (
        <Form>
            <Form.Field>
                <Input onChange={onChange} value={formPost.title} name="title" icon='clipboard' type='text' iconPosition='left' placeholder='Judul Post' />
            </Form.Field>
            <Form.Field>
                <TextArea onChange={onChange} value={formPost.body} name="body" placeholder='Isikan Body Post' style={{ minHeight: 100 }} />
            </Form.Field>
            <Button onClick={onSubmit} color='teal' fluid>Input</Button>
        </Form>   
    );
}

export default FormComponent;