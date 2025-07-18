import PageBreadcrumb from '@/components/PageBreadcrumb'
import { TbUserShield } from 'react-icons/tb'
import { Button, Container, Col, DropdownButton, DropdownItem, Form, FormControl, FormLabel, InputGroup, Row, FormCheck } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/InputGroupText'
import ComponentCard from '@/components/cards/ComponentCard'
import { Link } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import { TbCamera, TbChevronRight } from 'react-icons/tb'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import type { FilePondFile, FilePondInitialFile } from 'filepond'
const Page = () => {
    return (

        <Container fluid>
            <PageBreadcrumb title="Candidate Profile" subtitle="" />

            <Container>
                <Row>
                    <Col xl={12}>


                        <Form>
                            <ComponentCard title="Candidate Profile">

                                <Row>
                                    <Col xl={9}>

                                        <Row>

                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        IdNumber: <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        PFNo: <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        Firstname <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={8}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        Othernames <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        Gender <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        Email <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        PhoneNo <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        City <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={4}>
                                                <div className="mb-3">
                                                    <FormLabel htmlFor="userEmail">
                                                        PostalCode <span className="text-danger">*</span>
                                                    </FormLabel>
                                                    <div className="input-group">
                                                        <FormControl type="email" id="userEmail" placeholder="" required />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xl={3}>
                                        <div className="avatar-xxl">
                                            <FilePond
                                                className="filepond filepond-input-circle rounded"
                                                allowMultiple={false}
                                                maxFiles={1}
                                                acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
                                                stylePanelAspectRatio="1:1"
                                                labelIdle={ReactDOMServer.renderToStaticMarkup(<TbCamera className="fs-32 text-muted" />)}
                                            />
                                        </div>

                                    </Col>


                                </Row>


                                <Row>

                                    <Col sm={12}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Address <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="text" as="textarea" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>



                                </Row>


                            </ComponentCard>


                            <ComponentCard title="Employment Profile">
                                <Row>
                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Station <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Ministry <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Designation <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                DateOfHire <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </ComponentCard>


                            <ComponentCard title="Disability Profile">
                                <Row>
                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Disability <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Form of Disability <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="mb-3">
                                            <FormLabel htmlFor="userEmail">
                                                Special Arrangement <span className="text-danger">*</span>
                                            </FormLabel>
                                            <div className="input-group">
                                                <FormControl type="email" id="userEmail" placeholder="" required />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </ComponentCard>




                        </Form>


                    </Col>
                </Row>
            </Container>
        </Container>

    )
}

export default Page
