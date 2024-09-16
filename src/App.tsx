import { BrowserRouter } from "react-router-dom";
import Routing from "./routing";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainLayout } from "./components/layouts/MainLayout";
import { App, ConfigProvider, theme } from "antd";

const queryClient = new QueryClient();

function AppComponent() {
    return (
        <App>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ConfigProvider
                        theme={{
                            algorithm: theme.darkAlgorithm,
                        }}
                    >
                        <MainLayout>
                            <Routing />
                        </MainLayout>
                    </ConfigProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </App>
    );
}

export default AppComponent;
