import React, { useState } from "react";
import {TextField,Button,Card,CardContent,Typography,Grid,Box,MenuItem,Collapse,Chip} from "@mui/material";

const initialMembers = [
  {
    id: 1,
    name: "Anya Sharma",
    role: "Founder",
    focus: "Conscious Leadership",
    joinedDate: "2023-05-15",
    interests: ["Mindfulness", "AI Ethics"]
  },
  {
    id: 2,
    name: "Ben Carter",
    role: "Investor",
    focus: "AI Ethics",
    joinedDate: "2022-11-01",
    interests: ["Impact Investing", "Philosophy"]
  },
  {
    id: 3,
    name: "Chen Wei",
    role: "Mentor",
    focus: "Mindful Investing",
    joinedDate: "2024-01-20",
    interests: ["Stoicism", "Community Building"]
  },
  {
    id: 4,
    name: "David Lee",
    role: "Founder",
    focus: "Sustainable Tech",
    joinedDate: "2023-08-10",
    interests: ["Renewable Energy", "Circular Economy"]
  }
];

const sortOptions = [
  { value: "az", label: "Name (A-Z)" },
  { value: "za", label: "Name (Z-A)" }
];

const CommunityDirectory = () => {
  const [members, setMembers] = useState(initialMembers);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    focus: "",
    joinedDate: "",
    interests: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const errs = {};
    if (!newMember.name.trim()) errs.name = "Name is required";
    if (!newMember.joinedDate.trim()) errs.joinedDate = "Joined Date is required";
    return errs;
  };

  const handleAddMember = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const interestsArray = newMember.interests .split(",").map((i) => i.trim()) .filter((i) => i);
    const newId = members.length ? Math.max(...members.map(m => m.id)) + 1 : 1;
    setMembers([
      ...members,
      { id: newId, ...newMember, interests: interestsArray }
    ]);
    setNewMember({ name: "", role: "", focus: "", joinedDate: "", interests: "" });
    setErrors({});
  };

  const filteredMembers = members.filter((m) => m.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
      return sortOrder === "az"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Community Member Directory
      </Typography>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <TextField
          label="Filter by Name"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <TextField
          select
          label="Sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={2}>
        {filteredMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography color="textSecondary">
                  {member.role} - {member.focus}
                </Typography>
                <Button
                  size="small"
                  onClick={() =>
                    setExpandedIndex(index === expandedIndex ? null : index)
                  }
                >
                  {expandedIndex === index ? "Hide Details" : "View Details"}
                </Button>
                <Collapse in={expandedIndex === index}>
                  <Box mt={1}>
                    <Typography variant="body2">
                      Joined: {member.joinedDate}
                    </Typography>
                    <Typography variant="body2">Interests:</Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {member.interests.map((int, i) => (
                        <Chip label={int} key={i} />
                      ))}
                    </Box>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Add New Member
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(newMember).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={value}
                onChange={handleInputChange}
                variant="outlined"
                error={!!errors[key]}
                helperText={errors[key] || ""}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMember}
            >
              Add Member
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommunityDirectory;
