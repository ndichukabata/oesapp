import { useEffect } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { TbInfoCircle } from 'react-icons/tb'
import { toggleAttribute } from '@/helpers/layout'

const Page = () => {
  useEffect(() => {
    toggleAttribute('class', 'sidebar-with-line')

    return () => toggleAttribute('class', '')
  }, [])

  return (
    <Container fluid>
      <PageBreadcrumb title="With Lines Menu" />

      <Row>
        <Col sm={12}>
          <Alert variant="info" className="alert-bordered border-start border-info d-flex align-items-start gap-2">
            <TbInfoCircle className="fs-xxl" />
            <div>
              If you want to display a line with each menu item, add the class <code>"sidebar-with-line"</code> to the <code>&lt;html&gt;</code> tag.
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Page
