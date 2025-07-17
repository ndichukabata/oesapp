type PageMetaDataProps = {
  title: string
  description?: string
  keywords?: string
}

const defaultPageMetaData: PageMetaDataProps = {
  title: 'Online Examination Management System',
  description:
    'The Online Examination Management System for the Public Service Commission is a digital platform designed to streamline the administration, conduction, and evaluation of exams. It enables candidates to register, schedule exams, and access their results online.',
  keywords:
    'Online, Examination, Management, System',
}

const PageMetaData = ({ title, description = defaultPageMetaData.description, keywords = defaultPageMetaData.keywords }: PageMetaDataProps) => {
  return (
    <>
      <title>{title ? `${title} | ${defaultPageMetaData.title}` : defaultPageMetaData.title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  )
}
export default PageMetaData
