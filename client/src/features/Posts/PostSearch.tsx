import { ManageSearch } from '@mui/icons-material';
import {
  Box,
  Button,
  Drawer,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchProps } from 'src/interfaces';

export interface IPostSearchProps {
  currentPage: number;
  totalPage: number;
}

const initFormData = {
  page: 1,
  title: '',
  tags: [],
} as SearchProps;

export default function PostSearch({
  currentPage,
  totalPage,
}: IPostSearchProps) {
  const [formData, setFormData] = useState(initFormData);
  const [tags, setTags] = useState([] as string[]);
  const [title, setTitle] = useState('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTitle(e?.target?.value ?? '');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    setFormData({ ...formData, tags: newTags });
  };

  const onSearchSubmit = (e: any) => {
    e.preventDefault();

    if (!!formData.title || !!formData.tags) {
      currentPage = 1;
    }

    navigate(
      `/posts/search?page=${currentPage}&title=${formData.title}&tags=${formData.tags}`,
      { replace: true },
    );

    setOpenDrawer(false);
  };

  useEffect(() => {
    let tagsValue: string[] = [];

    const tagsParam = searchParams?.get('tags');

    if (tagsParam) {
      tagsValue = tagsParam?.split(',') ?? [];
    }
    setTags(tagsValue);

    const titleValue = searchParams?.get('title') ?? '';
    setTitle(titleValue);

    setFormData({ ...formData, tags: tagsValue, title: titleValue });
  }, [searchParams]);

  const DrawerList = (
    <Box sx={{ width: 350 }}>
      <Paper elevation={3} sx={{ minHeight: '100vh' }}>
        <Stack
          direction="column"
          component="form"
          autoComplete="off"
          sx={{ padding: 2 }}
          onSubmit={(e) => onSearchSubmit(e)}
        >
          <TextField
            value={title}
            label="Search Title"
            variant="outlined"
            name="title"
            size="small"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onChange={handleTitleChange}
          />
          <MuiChipsInput
            value={tags}
            label="Search Tags"
            placeholder="Enter Tags"
            name="tags"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            onChange={handleTagsChange}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Search
          </Button>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            mt: 2,
            mb: 2,
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pagination
            color="primary"
            count={totalPage}
            defaultPage={currentPage}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/posts/search?page=${item.page}&title=${
                  formData.title || ''
                }&tags=${formData.tags}`}
                onClick={() => setOpenDrawer(false)}
              />
            )}
          />
        </Stack>
      </Paper>
    </Box>
  );

  return (
    <>
      <Box sx={{ position: 'fixed', top: '100px', right: '0', zIndex: 1000 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => toggleDrawer(true)}
        >
          <ManageSearch />
        </Button>
      </Box>
      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
