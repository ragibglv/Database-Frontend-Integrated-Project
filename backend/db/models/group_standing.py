from dataclasses import dataclass

import mysql.connector
from db.db import db


@dataclass
class GroupStanding:
    tournament_id: str
    stage_number: int
    stage_name: str
    group_name: str
    position: str
    team_id: str
    played: int
    wins: int
    draws: int
    losses: int
    goals_for: int
    goals_against: int
    goal_difference: int
    points: int
    advanced: bool


class GroupStandingDAO():

    @staticmethod
    def insert_group_standing(db: db, group_standing: GroupStanding) -> None:
        try:
            conn = db.get_connection()
            query="""
                INSERT INTO group_standing (
                    tournament_id,
                    stage_number,
                    stage_name,
                    group_name,
                    position,
                    team_id,
                    played,
                    wins,
                    draws,
                    losses,
                    goals_for,
                    goals_against,
                    goal_difference,
                    points,
                    advanced
                ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            
            cursor = conn.cursor()
            cursor.execute(query, (
                group_standing.tournament_id,
                group_standing.stage_number,
                group_standing.stage_name,
                group_standing.group_name,
                group_standing.position,
                group_standing.team_id,
                group_standing.played,
                group_standing.wins,
                group_standing.draws,
                group_standing.losses,
                group_standing.goals_for,
                group_standing.goals_against,
                group_standing.goal_difference,
                group_standing.points,
                group_standing.advanced
                ))
            conn.commit()

        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def get_group_standing(db: db, tournament_id: str, stage_number: int, group_name: str, position: str) -> GroupStanding:

        try:
            conn = db.get_connection()
            query="""
                SELECT * FROM group_standing
                WHERE tournament_id=%s AND stage_number=%s AND group_name=%s AND position=%s
                """
            cursor = conn.cursor()
            cursor.execute(query, (
                tournament_id,
                stage_number,
                group_name,
                position
                ))
            result = cursor.fetchone()
            if result is None:
                return None
            return GroupStanding(*result)
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_group_standings_on_group(db: db, tournament_id: str, stage_number: int, group_name: str) -> list[GroupStanding]:
        try:
            conn = db.get_connection()
            query="""
                SELECT * FROM group_standing
                WHERE tournament_id=%s AND stage_number=%s AND group_name=%s
                """
            cursor = conn.cursor()
            cursor.execute(query, (
                tournament_id,
                stage_number,
                group_name
                ))
            result = cursor.fetchall()
            return [GroupStanding(*row) for row in result]
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def get_all_group_standings_on_stage(db: db, tournament_id: str, stage_number: int) -> list[GroupStanding]:
        try:
            conn = db.get_connection()
            query="""
                SELECT * FROM group_standing
                WHERE tournament_id=%s AND stage_number=%s
                """
            cursor = conn.cursor()
            cursor.execute(query, (
                tournament_id,
                stage_number
                ))
            result = cursor.fetchall()
            return [GroupStanding(*row) for row in result]
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_all_group_standings(db: db) -> list:
        try:
            conn = db.get_connection()
            query="""
                SELECT * FROM group_standing
            """
            cursor = conn.cursor()
            cursor.execute(query)
            result = cursor.fetchall()
            return [GroupStanding(*row) for row in result]
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def update_group_standing(db: db, group_standing: GroupStanding) -> None:
        try:
            conn = db.get_connection()
            query="""
                UPDATE group_standing SET
                    played=%s,
                    wins=%s,
                    draws=%s,
                    losses=%s,
                    goals_for=%s,
                    goals_against=%s,
                    goal_difference=%s,
                    points=%s,
                    advanced=%s
                    WHERE tournament_id=%s AND stage_number=%s AND group_name=%s AND position=%s
                    """
            cursor = conn.cursor()
            cursor.execute(query, (
                group_standing.played,
                group_standing.wins,
                group_standing.draws,
                group_standing.losses,
                group_standing.goals_for,
                group_standing.goals_against,
                group_standing.goal_difference,
                group_standing.points,
                group_standing.advanced,
                group_standing.tournament_id,
                group_standing.stage_number,
                group_standing.group_name,
                group_standing.position
                ))
            conn.commit()
            print("Group_standing updated")
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    
    @staticmethod
    def delete_group_standing(db: db, tournament_id: str, stage_number: int, group_name: str, position: str) -> None:
        try:
            conn = db.get_connection()
            query="""
                DELETE FROM group_standing
                WHERE tournament_id=%s AND stage_number=%s AND group_name=%s AND position=%s
                """
            cursor = conn.cursor()
            cursor.execute(query, (
                tournament_id,
                stage_number,
                group_name,
                position
                ))
            conn.commit()
            print("Group_standing deleted")
        except mysql.connector.Error as err:
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
    