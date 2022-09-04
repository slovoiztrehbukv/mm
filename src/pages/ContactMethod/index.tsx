import { LoginForm } from "../../components/LoginForm";
import { ContentLayout } from "../../layouts/Content";

export const ContactMethod = () => {
    return (
        <ContentLayout>
            <div className="container text-center flex justify-between">
                <LoginForm />
            </div>
        </ContentLayout>
    )
}