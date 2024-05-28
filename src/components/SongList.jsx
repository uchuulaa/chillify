// src/components/SongList.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, createSong, editSong, removeSong } from '../slices/songSlice';
import styled from '@emotion/styled';
import { space, color, layout, typography, flexbox } from 'styled-system';

const Container = styled.div(
  space,
  color,
  layout,
  typography,
  flexbox
);

const Button = styled.button(
  space,
  color,
  layout,
  typography,
  {
    cursor: 'pointer',
    borderRadius: '5px',
  }
);

const Input = styled.input(
  space,
  color,
  layout,
  typography,
  {
    borderRadius: '5px',
    padding: '0.5rem',
  }
);

const ITEMS_PER_PAGE = 5;

const SongList = () => {
  const dispatch = useDispatch();
  const { list: songs, loading, error } = useSelector(state => state.songs);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [newSong, setNewSong] = useState('');
  const [editSongId, setEditSongId] = useState(null);
  const [editSongTitle, setEditSongTitle] = useState('');

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleCreateSong = () => {
    if (newSong.trim()) {
      dispatch(createSong({ title: newSong }));
      setNewSong('');
    }
  };

  const handleEditSong = (id, title) => {
    setEditSongId(id);
    setEditSongTitle(title);
  };

  const handleUpdateSong = () => {
    dispatch(editSong({ id: editSongId, title: editSongTitle }));
    setEditSongId(null);
    setEditSongTitle('');
  };

  const handleDeleteSong = id => {
    dispatch(removeSong({ id }));
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(songs.length / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSongs = songs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Container
      bg="linear-gradient(to right, purple, pink, red)"
      p={6}
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Container
        bg="gray.100"
        p={6}
        borderRadius="10px"
        boxShadow="lg"
        maxWidth="600px"
        width="100%"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Song List</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-4">
          {paginatedSongs.map(song => (
            <Container
              key={song.id}
              bg="white"
              p={4}
              borderRadius="10px"
              boxShadow="sm"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {editSongId === song.id ? (
                <Input
                  type="text"
                  value={editSongTitle}
                  onChange={e => setEditSongTitle(e.target.value)}
                  flexGrow={1}
                  mr={3}
                />
              ) : (
                <span className="flex-grow">{song.title}</span>
              )}
              {editSongId === song.id ? (
                <Button
                  onClick={handleUpdateSong}
                  bg="green"
                  color="white"
                  p={2}
                  ml={3}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => handleEditSong(song.id, song.title)}
                  bg="blue"
                  color="white"
                  p={2}
                  ml={3}
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => handleDeleteSong(song.id)}
                bg="red"
                color="white"
                p={2}
                ml={3}
              >
                Delete
              </Button>
            </Container>
          ))}
        </ul>
        <Container display="flex" justifyContent="space-between" mt={4}>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            bg={currentPage === 1 ? 'gray' : 'indigo'}
            color="white"
            p={2}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(songs.length / ITEMS_PER_PAGE)}
            bg={currentPage === Math.ceil(songs.length / ITEMS_PER_PAGE) ? 'gray' : 'green'}
            color="white"
            p={2}
          >
            Next
          </Button>
        </Container>
        {!editSongId && (
          <Container display="flex" justifyContent="space-between" mt={4}>
            <Input
              type="text"
              value={newSong}
              onChange={e => setNewSong(e.target.value)}
              placeholder="New Song"
              flexGrow={1}
              mr={3}
              
            />
            <Button
              onClick={handleCreateSong}
              bg="orange"
              color="white"
              p={2}
            >
              Add Song
            </Button>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default SongList;
