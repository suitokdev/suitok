import { Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const Loader = () => {
  return (
    <Flex align="center" justify="center" style={{ width: "100%", height: "100%" }}>
        <Spin
            indicator={
                <LoadingOutlined
                    style={{ fontSize: 48, color: "var(--color-primary)" }}
                    spin
                />
            }
        />
    </Flex>
  )
}
