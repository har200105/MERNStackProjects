
              </IconButton>
              <IconButton className="iconOfLikeDislike">
                <ShareDialog />
              </IconButton>
            </div>
            <hr />
            <div className="flex">
              <Avatar />
              <h4>{writer}</h4>
              {isAuth() ? (
                <Button className="btn__subscribe">
                  <NotificationsActiveIcon />
                  &nbsp;&nbsp;Subscribe
                </Button>